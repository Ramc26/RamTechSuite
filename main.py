
import logging
import requests
from datetime import datetime
import time

# --- CONFIGURATION ---
USERNAME = "ramc26"
START_DATE = "2019-01-01T00:00:00Z"

# --- LOGGING SETUP ---
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

def get_rest_commit_count(username, token, since_date):
    logging.info(f"Starting REST fetch for user: {username}")
    
    # Using the search/commits endpoint for comprehensive search
    # Note: Search API has stricter rate limits.
    url = "https://api.github.com/search/commits"
    headers = {
        "Authorization": f"Bearer {token}",
        "Accept": "application/vnd.github.v3+json" # Required for search/commits
    }
    
    query_params = f"author:{username} committer-date:>={since_date}"
    params = {"q": query_params, "per_page": 1}
    
    logging.info("Sending request to GitHub REST Search API...")
    
    response = requests.get(url, headers=headers, params=params)
    
    if response.status_code == 200:
        data = response.json()
        total_count = data.get("total_count", 0)
        logging.info(f"Successfully retrieved total commit count: {total_count}")
        return total_count
        
    elif response.status_code == 403: # Rate limit or forbidden
         logging.error("Forbidden or Rate Limit reached.")
         logging.error(response.json())
         return None
    else:
        logging.error(f"Failed to connect: HTTP {response.status_code}")
        logging.error(f"Response: {response.text}")
        return None

if __name__ == "__main__":
    total = get_rest_commit_count(USERNAME, GITHUB_TOKEN, START_DATE)

    if total is not None:
        print(f"\n--- REST API Commit Stats for {USERNAME} ---")
        print(f"Since: {START_DATE}")
        print(f"Total Exact Commits Found via Search: {total}")