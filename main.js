var fetch = function (query) {
  $.ajax({
    method: "GET",
    url: `https://www.googleapis.com/books/v1/volumes?q=${query}`,
    dataType: "json",
    success: function (data) {
      addBooks(data);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    }
  });

};


var books = [];

function addBooks(data) {
  books = [];
  for (var i = 0; i < data.items.length; i++) {
    var booksObj = {};
    booksObj.title = data.items[i].volumeInfo.title;
    if (data.items[i].volumeInfo.authors) {
      booksObj.author = data.items[i].volumeInfo.authors[0];
    } else {
      booksObj.author = " ";
    }
    if (data.items[i].volumeInfo.imageLinks) {
      booksObj.imageUrl = data.items[i].volumeInfo.imageLinks.smallThumbnail;
    } else {
      booksObj.imageUrl = " ";
    }
    if (data.items[i].volumeInfo.industryIdentifiers) {
      booksObj.isbn = data.items[i].volumeInfo.industryIdentifiers[0].identifier;
    } else {
      booksObj.isbn = " ";
    }
    if (data.items[i].volumeInfo.pageCount) {
      booksObj.pageCount = data.items[i].volumeInfo.pageCount;
    } else {
      booksObj.pageCount = " ";
    }
    books.push(booksObj);
  }
  console.log('books', books);
  renderBooks();
};

var renderBooks = function () {
  $('.books').empty();

  for (var i = 0; i < books.length; i++) {
    // create HTML and append to .books
    var source = $('#book-template').html();

    var template = Handlebars.compile(source);

    var newHtml = template({
      title: books[i].title,
      author: books[i].author,
      pageCount: books[i].pageCount,
      isbn: books[i].isbn,
      imageURL: books[i].imageUrl,
    });
    $('.books').append(newHtml);
  }

};

$(document).ready(function () {

  $('.search').on('click', function () {
    $('.books').empty();
    var search = $('#search-query').val();
    fetch(search);
  });

});

