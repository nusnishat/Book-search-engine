const bookLoad = () => {
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;
    fetch(`https://openlibrary.org/search.json?q=${searchText}`)
    .then(response => response.json())
    .then(data => displayBook(data,data.docs));

    // clear searchField
    searchField.value = '';
}

const displayBook = (data,books) => {

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

        const col = document.createElement('div');
        col.classList.add('col');

        const card = document.createElement('div');
        card.classList.add('card');
        // check image
        if(book.cover_i == undefined)
        {
            card.innerHTML = `
            <img style="height:18rem;" src="no-image.jpg" class="card-img-top" alt="...">
            `
        }
        else
        {
            card.innerHTML = `
            <img style="height:18rem;" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
            `
        }
        // card body consists of book-title and book-description
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        // book title
        const h5 = document.createElement('h5');
        h5.classList.add('card-title', 'fw-bolder', 'pb-2')
        h5.innerText = `${book.title}`;
        // book description with condition check
        // author name
        const p1 =  document.createElement('p');
        p1.classList.add('text-primary');
        if(book.author_name != undefined)
        {
            p1.innerText = `Author Name: ${book.author_name[0]}`;
        }
        else
        {
            p1.innerText = `Publisher : undefined`;
        }
        // publish date
        const p2 =  document.createElement('p');
        if(book.first_publish_year != undefined)
        {
            p2.innerText = `First Published on : ${book.first_publish_year}`;
        }
        else
        {
            p2.innerText = `First Published on : undefined`;
        }
        // publisher
        const p3 =  document.createElement('p');
        if(book.publisher != undefined)
        {
            p3.innerText = `Publisher : ${book.publisher[0]}`;
        }
        else
        {
            p3.innerText = `Publisher : undefined`;
        }
        // append all child
        cardBody.appendChild(h5);
        cardBody.appendChild(p1);
        cardBody.appendChild(p2);
        cardBody.appendChild(p3);
        card.appendChild(cardBody);
        col.appendChild(card);
        div.appendChild(col);     
        displayField.appendChild(div);
    }
    
}