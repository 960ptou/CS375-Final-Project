\copy book FROM './dummy_setup/generatedData/book.csv' DELIMITER ',' CSV HEADER;
\copy book_genre FROM './dummy_setup/generatedData/genres.csv' DELIMITER ',' CSV HEADER;
\copy users FROM './dummy_setup/generatedData/users.csv' DELIMITER ',' CSV HEADER;
\copy ownby FROM './dummy_setup/generatedData/ownby.csv' DELIMITER ',' CSV HEADER;