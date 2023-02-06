# Ewidencja czasu pracy clockify

Prosta aplikacja do automatyzowania wypełniania ewidencji czasu pracy za pomocą
raportów w formie plików CSV z Clockify.

## Instalacja

Zarówno frontend jak i backend aplikacji są napisane w języku TypeScript,
z użyciem menadżera pakietów Yarn. Aby zainstalować zależności, należy wykonać
następujące polecenia:

```sh
cd frontend/ && yarn --frozen-lockfile
```

```sh
# z głównego katalogu projektu, użyj cd ../backend jeśli jesteś w katalogu frontend/
cd backend/ && yarn --frozen-lockfile
```

## Uruchomienie

Aby uruchomić aplikację, należy wykonać następujące polecenia:

```sh
cd backend/ && yarn start:dev
```

```sh
cd frontend/ && yarn start
```

Komendy te pozwolą uruchomić aplikację w trybie deweloperskim.

## Uruchamianie za pomocą Dockera

### Pojedynczy plik Dockerfile

Aplikacja zawiera zbiorczy plik Dockerfile, który pozwala na uruchomienie
zarówno frontendu, jak i backendu. Aby zbudować obraz, należy wykonać następujące
polecenie:

```sh
docker build -t ewidencja-clockify .
```

Aby uruchomić aplikację, należy wykonać następujące polecenie:

```sh
docker run -p 3000:3000 -d ewidencja-clockify
```

Możliwe jest również osobne uruchamianie frontendu i backendu. Aby zbudować
obrazy, należy wykonać następujące polecenia:

```sh
docker build -t ewidencja-clockify-frontend -f frontend/Dockerfile ./frontend
```

```sh
docker build -t ewidencja-clockify-backend -f backend/Dockerfile ./backend
```

Aby uruchomić aplikację, należy wykonać następujące polecenia:

```sh
docker run -p 4200:4200 -d ewidencja-clockify-frontend
docker run -p 3000:3000 -d ewidencja-clockify-backend
```

## Wdrażanie do klastra Kubernetes za pomocą narzędzia Helm

Aplikacja zawiera pliki konfiguracyjne dla narzędzia Helm, które pozwolą na
automatyczne wdrażanie aplikacji do klastra Kubernetes.
Aby zainstalować aplikację, należy wykonać następujące polecenie:

```sh
helm upgrade --install -n ewidencja-clockify ewidencja-clockify ./chart
```

## Export odpowiedniego pliku CSV

Aplikacja potrzebuje pliku CSV o następującej strukturze:

```csv
"Date","Time (h)","Time (decimal)"
```

Z danymi z całego miesiąca. Aby wyeksportować odpowiedni plik, należy wykonać
następujące kroki:

1. Zaloguj się do Clockify
2. Przejdź do zakładki "Reports"
3. Wybierz zakładkę "Summary" z górnego paska nawigacji
4. W prawym górnym rogu wybierz okres 'Last month' (lub inny, jeśli chcesz
   wypełnić ewidencję czasu pracy za inny miesiąc)
5. W dolnej części ekranu wybierz "Broup by" -> "Date", oraz (None)
6. W prawym górnym rogu wybierz "Export" -> "CSV"
7. Zapisz plik CSV w odpowiednim miejscu
8. Otwórz plik i zweryfikuj, czy zawiera on odpowiednią strukturę (patrz powyżej)
