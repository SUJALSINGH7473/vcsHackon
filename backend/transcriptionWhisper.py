import io
import os
import openai
from fastapi import UploadFile
# import assemblyai as aai
# from dotenv import load_dotenv
# load_dotenv()
# aai.settings.api_key = os.environ.get("ASSEMBLYAI_API_KEY")
# transcriber = aai.Transcriber()
#
# transcript = transcriber.transcribe("https://storage.googleapis.com/aai-web-samples/news.mp4")


class NamedBytesIO(io.BytesIO):
    def __init__(self, content, name):
        super().__init__(content)
        self.name = name


async def get_transcription(audio_file: UploadFile):
    try:
        # Get the OpenAI API key from environment variables
        api_key = os.environ.get("OPENAI_API_KEY")
        if not api_key:
            raise ValueError("OPENAI_API_KEY environment variable not set")
        openai.api_key = api_key

        try:
            # Read the file content into memory
            audio_content = await audio_file.read()
        except Exception as e:
            raise IOError(f"Failed to read the audio file: {e}")

        # Create a NamedBytesIO object
        named_audio_file = NamedBytesIO(audio_content, audio_file.filename)

        try:
            # Transcribe the audio using OpenAI API
            translation = openai.Audio.transcribe(
                model="whisper-1",
                file=named_audio_file,
                language="en",
                temperature=0.2,
            )
        except Exception as e:
            raise RuntimeError(f"Failed to transcribe the audio: {e}")

        return translation['text']
    except Exception as e:
        # Handle all other exceptions
        raise RuntimeError(f"Failed to transcribe the audio, some unknown exception: {e}")
