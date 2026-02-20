# Use Python 3.12 to avoid the Pydantic compatibility issue with Python 3.14
FROM python:3.12-slim

# Hugging Face requires a non-root user with UID 1000 for security
RUN useradd -m -u 1000 user

# Switch to the new user
USER user

# Set up environment variables for the user and tell AI libraries where to cache
ENV HOME=/home/user \
    PATH=/home/user/.local/bin:$PATH \
    # Redirect heavy ML model downloads to the user's directory to avoid permission errors
    HF_HOME=/home/user/app/cache \
    TRANSFORMERS_CACHE=/home/user/app/cache

# Set the working directory
WORKDIR $HOME/app

# Copy requirements first to leverage Docker layer caching
COPY --chown=user:user requirements.txt .

# Install dependencies (the --no-cache-dir flag keeps the image size small)
RUN pip install --no-cache-dir --upgrade -r requirements.txt

# Copy your actual application code
COPY --chown=user:user . .

# Expose Hugging Face's mandatory port
EXPOSE 7860

# Start the Uvicorn server, bound to 0.0.0.0 and port 7860
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]