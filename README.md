1. Utwórz aplikację React o dowolnej konfiguracji. Wykorzystaj w projekcie język
   Typescript.
2. Dodaj i wykorzystaj bibliotekę React router dom, aby stworzyć routing dla stron:
   a. Home
   b. Products
3. Zadbaj o przypadek gdy użytkownik znajdzie się pod niepoprawnym adresem.
4. Na każdej stronie ma znajdować się nawigacja, dzięki której możemy przejść na
   stronę z produktami oraz na stronę główną.
5. Na stronie z produktami (Products) należy pobrać listę produktów z użyciem
   https://fakestoreapi.com/. Do pobrania można wykorzystać Fetch Api lub dowolną
   bibliotekę.
   a. Przedstaw produkty w formie listy pokazując zdjęcie, tytuł, cenę, kategorię i
   ocenę.
   b. Dodaj możliwość sortowania po tytule, cenie lub domyślnie.
6. Funkcjonalność koszyka:
   a. Każdy produkt można dodać i usunąć z koszyka.
   b. Przy każdym produkcie należy wskazać aktualnie wybraną ilość.
   c. Koszyk przechowuje stan wybranych produktów.
   d. W prawym górnym rogu aplikacji pokazywana jest ikona symbolizująca
   koszyk.
   e. Ikona zawiera informację o ilości wybranych produktów (badge).
   f. Ikona jest widoczna na wszystkich stronach.
   g. Po odświeżeniu strony stan koszyka jest zachowany.
7. Podczas ładowania produktów pokaż informację o pobieraniu.
8. W przypadku błędu pobierania pokaż informację (np. “Nie udało się pobrać
   produktów”)
9. Na stronie głównej ma pojawiać się losowy produkt, który może zostać dodany do
   koszyka
