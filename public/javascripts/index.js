$(document).ready(function () {
  $('button#scrape').click(function (e) { 
    e.preventDefault();
    $(this).find('span.scrape').css('display', 'none');
    $(this).find('span.scraping').css('display', 'block');
    document.querySelector('button#scrape').disabled = true;
    
    $('.results').html('');
    
    fetch('/scrape').then(function (results) {
      results.json().then(function (data) {
        $('button#scrape span.scrape').css('display', 'block');
        $('button#scrape span.scraping').css('display', 'none');
        document.querySelector('button#scrape').disabled = false;
        
        let html = '<h5>Scraped at: ' + moment().format('MM/DD/YYYY HH:mm A') + '</h5>'
        html += '<ol>'
        
        for (let i = 0; i < data.results.length; i++) {
          html += '<li>' + data.results[i] + '</li>'
        }
        
        html += '</ol>';
        $(html).appendTo('.results');
      })
    })
  });
});