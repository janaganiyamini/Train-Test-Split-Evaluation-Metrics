import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface TrainingRequest {
  datasetSize: number;
  testSplitRatio: number;
}

function simulateLogisticRegression(datasetSize: number, testSplitRatio: number) {
  const trainSize = Math.floor(datasetSize * (1 - testSplitRatio));
  const testSize = datasetSize - trainSize;

  const baseAccuracy = 0.82 + (Math.random() * 0.08);
  const accuracy = Math.min(0.95, Math.max(0.75, baseAccuracy));

  const precision = accuracy + (Math.random() * 0.05 - 0.025);
  const recall = accuracy + (Math.random() * 0.05 - 0.025);
  const f1Score = 2 * (precision * recall) / (precision + recall);

  const truePositives = Math.floor(testSize * 0.45 * recall);
  const falseNegatives = Math.floor(testSize * 0.45) - truePositives;
  const trueNegatives = Math.floor(testSize * 0.55 * (precision / accuracy));
  const falsePositives = testSize - truePositives - falseNegatives - trueNegatives;

  return {
    trainSize,
    testSize,
    accuracy: Number(accuracy.toFixed(4)),
    precision: Number(precision.toFixed(4)),
    recall: Number(recall.toFixed(4)),
    f1Score: Number(f1Score.toFixed(4)),
    confusionMatrix: {
      truePositives,
      falsePositives,
      trueNegatives,
      falseNegatives
    }
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { datasetSize, testSplitRatio }: TrainingRequest = await req.json();

    const results = simulateLogisticRegression(datasetSize, testSplitRatio);

    const { data, error } = await supabase
      .from("model_results")
      .insert({
        dataset_name: "Heart Disease Dataset",
        train_size: results.trainSize,
        test_size: results.testSize,
        accuracy: results.accuracy,
        precision: results.precision,
        recall: results.recall,
        f1_score: results.f1Score,
        confusion_matrix: results.confusionMatrix,
      })
      .select()
      .maybeSingle();

    if (error) {
      throw error;
    }

    return new Response(
      JSON.stringify({
        success: true,
        results: data,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
