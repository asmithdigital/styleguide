// Manually build the pagination
(function($) {
  let current;
  let itemsArray = [];

  // Loop each docs left menu item and push each item into the itemsArray.
  // Find the current page menu item which has the class of 'current'.
  $('.docs-nav-container .docs-nav-subcategory li').each(function(i) {
    itemsArray.push(this);
    if ($(this).hasClass('current')) {
      current = this;
      this.index = i;
    }
  });

  // get the previous and next items in the array, based on the current index
  // as well as get the href and text of the previous and next items
  let previous = itemsArray[current.index - 1];
  let next = itemsArray[current.index + 1];
  let previous_text = $(previous).find('a').children().remove().end().text();
  let next_text = $(next).find('a').children().remove().end().text();
  let previous_href = $(previous).find('a').attr('href');
  let next_href = $(next).find('a').attr('href');

  // The pagination menu items
  let pagination_prev = $('.docs-pagination-prev').find('a').first();
  let pagination_next = $('.docs-pagination-next').find('a').first();

  // Set the previous and next item, if they exists in the array,
  // otherwise hide dud previous or next pagination item markup
  if (typeof previous !== 'undefined'){
    pagination_prev.find('span').text(previous_text);
    pagination_prev.attr('href', previous_href);
  } else {
    pagination_prev.hide()
  }
  if (typeof next !== 'undefined'){
    pagination_next.find('span').text(next_text);
    pagination_next.attr('href', next_href);
  } else {
    pagination_next.hide()
  }
})(jQuery);
