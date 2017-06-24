//variables
 $(".button-collapse").sideNav();
$addMe = $('#left').children().children().children().children('.card');
$totals = $('#totals');
let subtotal = $('#subtotal');
let total = $('#total');
let tax = $('#tax');

//event listeners
$addMe.on('click', addToCart);
$('#submitButton').on('click', checkValid);

//functions
function addToCart(event) {
  event.preventDefault();
  if (event.target.tagName === 'A') {
    let name = $(this).children().children('h6').text();
    let price = $(this).children().children('p').text();
    let $row = $('<tr>');
    $row.append($('<td>').append(name));
    $row.append($('<td>').append(price).addClass("right"));
    $('#basket').append($row);
    let minus$ = price.slice(1, price.length);
    $totals.css("visibility", "visible");
    adjustTotals(Number(minus$));
  }
}

function adjustTotals(price) {
  //calculates subtotal
  let workingSubtotal = subtotal.text().replace('$', '');
  workingSubtotal = Number(workingSubtotal);
  workingSubtotal += price;
  subtotal.text("$" + workingSubtotal.toFixed(2));
  //calculates tax
  let workingTax = Number((workingSubtotal*.1));
  tax.text('$' + workingTax.toFixed(2));
  //addes those two to find total
  total.text('$' + (workingTax + workingSubtotal).toFixed(2));
}

function checkValid(event) {
  if ($('tbody').children().length === 0) {
    Materialize.toast('Add something to your order first!', 4000);
    return;
  }
  console.log("this is the value" + $('#name').val().length + "right here");
  if ($('#name').val().length === 0) {
    Materialize.toast('But... Who are you?', 4000);
    return;
  }
  if ($('#phone').val().length > 10 || $('#phone').val().match(/[0-9]{10}/) === null) {
    Materialize.toast('That phone number makes no sense. We want need 10 number characters, no more, no less...', 4000);
    return;
  }
  if ($('#address').val().length === 0) {
    Materialize.toast('Well yeah, but what is your REAL address...?', 4000);
    return;
  }
  Materialize.toast('Your order has been submitted! Food is being rushed to you now!', 4000);
}
