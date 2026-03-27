import os
import subprocess
from pathlib import Path
from huggingface_hub import hf_hub_download

# --- Configuration ---
MODEL_REPO = "Qwen/Qwen3-4B-GGUF"
MODEL_FILE = "Qwen3-4B-Q8_0.gguf"
MODELS_DIR = Path("./models")
HOST = "0.0.0.0"  # Listen on all interfaces
PORT = 30000      # Your requested port
N_THREADS = 8     # c4-standard-8
N_CTX = 16384

def setup_server():
    # 1. Ensure models directory exists
    MODELS_DIR.mkdir(parents=True, exist_ok=True)
    model_path = MODELS_DIR / MODEL_FILE

    # 2. Download model if it doesn't exist
    if not model_path.exists():
        print(f"Downloading {MODEL_FILE} from Hugging Face...")
        hf_hub_download(
            repo_id=MODEL_REPO,
            filename=MODEL_FILE,
            local_dir=MODELS_DIR,
            local_dir_use_symlinks=False
        )
    
    # 3. Launch the server
    # We use the llama_cpp.server module which is OpenAI compatible
    print(f"Starting server on {HOST}:{PORT}...")
    cmd = [
        "python3", "-m", "llama_cpp.server",
        "--model", str(model_path),
        "--host", HOST,
        "--port", str(PORT),
        "--n_threads", str(N_THREADS),
        "--n_ctx", str(N_CTX),
        "--n_gpu_layers", "0"  # Force CPU
    ]
    
    try:
        subprocess.run(cmd, check=True)
    except KeyboardInterrupt:
        print("\nServer stopped.")

if __name__ == "__main__":
    setup_server()