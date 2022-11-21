# if you already have data in the books and just want to update based on that data
# make sure your python works (have packages)
echo "Making" $1 "users"


bash dummy_setup/refreshdb.bash
echo "running csv in python"
python dummy_setup/fillDatabaseFromBooks.py $1
echo "loading to db"
bash dummy_setup/filldb.bash