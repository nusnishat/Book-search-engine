const bookLoad = () => {
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;
    fetch(`https://openlibrary.org/search.json?q=${searchText}`)
    .then(response => response.json())
    .then(data => displayBook(data.docs));

    // clear searchField
    searchField.value = '';
}

const displayBook = books => {
    // display total book number
    const totalBooksShow = document.getElementById('total-books');
    totalBooksShow.textContent = '';
    const totalBooks = books.length;
    if(totalBooks > 0)
    {
        totalBooksShow.innerHTML = `
        <h3 class="text-center">Total Books found : ${totalBooks}</h3>`;
    }
    else
    {
        totalBooksShow.innerHTML = `
        <h3 class="text-center">No result found</h3>`;
    }
    
    // display each book
    const displayField = document.getElementById('display-field');
    displayField.textContent = '';
    for(const book of books)
    {   
        const div = document.createElement('div');
        // console.log(book.title, book.publisher[0], book.first_publish_year);
        if(book.cover_i == undefined)
        {
            div.innerHTML = `
        <div class="col">
          <div class="card">
            <img style="height:18rem;" src="no-image.jpg" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title fw-bolder mb-1">${book.title}</h5>
              <p class="text-primary">Author Name: ${book.author_name[0]}</p>
              <p class="">First Published on : ${book.first_publish_year}</p>
              <p class="">Publisher : ${book.publisher[0]}</p>
            </div>
          </div>
        </div>
        `
        displayField.appendChild(div);
        }
        else
        {
            div.innerHTML = `
        <div class="col">
          <div class="card">
            <img style="height:18rem;" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title fw-bolder">${book.title}</h5>
              <p class="text-primary">Author Name: ${book.author_name[0]}</p>
              <p class="">First Published on : ${book.first_publish_year}</p>
              <p class="">Publisher : ${book.publisher[0]}</p>
            </div>
          </div>
        </div>
        `
        displayField.appendChild(div);
        }
        
    }
    
}