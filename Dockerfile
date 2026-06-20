FROM python:3.12

WORKDIR /workspace

# Copia o requirements de dentro de src
COPY src/requirements.txt ./src/
RUN pip install --no-cache-dir -r ./src/requirements.txt

# Copia a pasta src INTEIRA
COPY src/ ./src/

EXPOSE 8000

# O Uvicorn chama a partir da pasta src
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]