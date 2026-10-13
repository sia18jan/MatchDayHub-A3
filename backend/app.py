import os

from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
from supabase import create_client

load_dotenv()

app = Flask(__name__)
CORS(app)

supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_KEY")

if not supabase_url or not supabase_key:
    raise ValueError("Supabase environment variables are missing.")

supabase = create_client(supabase_url, supabase_key)



@app.route("/api/health")
def health_check():
    return jsonify({
        "status": "ok",
        "message": "MatchDay Hub Python backend is running"
    })


@app.route("/api/fixtures")
def get_fixtures():
    response = supabase.table("fixtures").select("*").execute()

    return jsonify({
        "status": "ok",
        "fixtures": response.data
    })

@app.route("/api/fixtures", methods=["POST"])
def create_fixture():
    data = request.get_json()

    required_fields = ["home_team", "away_team", "field", "match_time"]

    if not data or any(not data.get(field) for field in required_fields):
        return jsonify({
            "status": "error",
            "message": "All fixture fields are required."
        }), 400

    fixture = {
        "home_team": data["home_team"],
        "away_team": data["away_team"],
        "field": data["field"],
        "match_time": data["match_time"],
        "home_score": 0,
        "away_score": 0,
        "status": "scheduled"
    }

    response = supabase.table("fixtures").insert(fixture).execute()

    return jsonify({
        "status": "ok",
        "message": "Fixture created successfully",
        "fixture": response.data[0]
    }), 201

    return jsonify({
        "status": "ok",
        "message": "Fixture created successfully",
        "fixture": response.data[0]
    }), 201


@app.route("/api/fixtures/latest")
def get_latest_fixture():
    response = (
        supabase
        .table("fixtures")
        .select("*")
        .order("id", desc=True)
        .limit(1)
        .execute()
    )

    if not response.data:
        return jsonify({
            "status": "error",
            "message": "No fixtures found."
        }), 404

    return jsonify({
        "status": "ok",
        "fixture": response.data[0]
    })

@app.route("/api/fixtures/<int:fixture_id>/score", methods=["PUT"])
def update_score(fixture_id):
    data = request.get_json()

    if (
        not data
        or "home_score" not in data
        or "away_score" not in data
    ):
        return jsonify({
            "status": "error",
            "message": "Both scores are required."
        }), 400

    home_score = data["home_score"]
    away_score = data["away_score"]

    if (
        not isinstance(home_score, int)
        or not isinstance(away_score, int)
        or home_score < 0
        or away_score < 0
    ):
        return jsonify({
            "status": "error",
            "message": "Scores must be non-negative whole numbers."
        }), 400

    response = (
        supabase
        .table("fixtures")
        .update({
            "home_score": home_score,
            "away_score": away_score,
            "status": "completed"
        })
        .eq("id", fixture_id)
        .execute()
    )

    if not response.data:
        return jsonify({
            "status": "error",
            "message": "Fixture not found."
        }), 404

    return jsonify({
        "status": "ok",
        "message": "Score updated successfully",
        "fixture": response.data[0]
    })

@app.route("/api/dashboard")
def get_dashboard():
    response = (
        supabase
        .table("fixtures")
        .select("*")
        .order("id", desc=True)
        .execute()
    )

    fixtures = response.data

    scheduled_fixtures = [
        fixture for fixture in fixtures
        if fixture["status"] == "scheduled"
    ]

    completed_fixtures = [
        fixture for fixture in fixtures
        if fixture["status"] == "completed"
    ]

    active_fields = len(set(
        fixture["field"]
        for fixture in scheduled_fixtures
        if fixture.get("field")
    ))

    recent_result = (
        completed_fixtures[0]
        if completed_fixtures
        else None
    )

    return jsonify({
        "status": "ok",
        "active_fields": active_fields,
        "completed_matches": len(completed_fixtures),
        "total_fixtures": len(fixtures),
        "recent_result": recent_result
    })

if __name__ == "__main__":
    app.run(debug=True, port=5000)

