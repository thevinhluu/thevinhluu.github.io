let users = [{
  avatar: '<img src="img/ronaldo.jpeg" alt="ronaldo">',
  firstName: 'Cristiano',
  lastName: 'Ronaldo',
  phoneNumber: '0989113113',
  email: 'ronaldo @foo.com',
  birthYear: 1985
},
{
  avatar: '<img src="img/messi.jpeg" alt="messi">',
  firstName: 'Lionel',
  lastName: 'Messi',
  phoneNumber: '0904584861',
  email: 'messi @stewart.com',
  birthYear: 1987
},
{
  avatar: '<img src="img/vanhau.jpeg" alt="vanhau">',
  firstName: 'Doan Van',
  lastName: 'Hau',
  phoneNumber: '0917122777',
  email: 'haudv @gmail.com',
  birthYear: 1999
},
{
  avatar: '<img src="img/quanghai.jpeg" alt="quanghai">',
  firstName: 'Nguyen Quang',
  lastName: 'Hai',
  phoneNumber: '0988482666',
  email: 'quanghai @gmail.com',
  birthYear: 1997
},
{
  avatar: '<img src="img/xuantruong.jpeg" alt="xuantruong">',
  firstName: 'Luong Xuan',
  lastName: 'Truong',
  phoneNumber: '0913522367',
  email: 'truonglx @gmail.com',
  birthYear: 1995
},
{
  avatar: '<img src="img/congphuong.jpeg" alt="congphuong">',
  firstName: 'Nguyen Cong',
  lastName: 'Phuong',
  phoneNumber: '0979898797',
  email: 'phuongnc @gmail.com',
  birthYear: 1995
},
{
  avatar: '<img src="img/tiendung.jpeg" alt="tiendung">',
  firstName: 'Bui Tien',
  lastName: 'Dung',
  phoneNumber: '0914225552',
  email: 'dungbt @gmail.com',
  birthYear: 1997
},
{
  avatar: '<img src="img/quehai.jpeg" alt="quengochai">',
  firstName: 'Que Ngoc',
  lastName: 'Hai',
  phoneNumber: '0987654321',
  email: 'haiqn @gmail.com',
  birthYear: 1997
}
];

// Ham render du lieu
function renderContent() {
  let htmlContent = '';

  for (let i = 0; i < users.length; i++) {
    const user = users[i];

    htmlContent +=
      `<tr>
              <td>${user.avatar}</td>
              <td>${user.firstName}</td>
              <td>${user.lastName}</td>
              <td>${user.phoneNumber}</td>
              <td>${user.email}</td>
              <td>${user.birthYear}</td>
              <td>
                  <a href="javascript:void(0)" class="delete-btn" onclick="deleteUser(${i}, this)">
                    <i class="fa fa-trash" aria-hidden="true"></i> Delete
                    </a>
              </td>
          </tr>`;
  }
  $('tbody').html(htmlContent);
}

// Ham xoa du lieu
function deleteUser(index, deleteButton) {
  // Xóa dữ liệu trong mảng
  users.splice(index, 1);

  if (confirm("Are you sure?")) {
    // Cách 1: Render lại toàn bộ bảng dựa vào mảng sau khi bị xóa
    // renderContent();

    // Cách 2: Xóa dòng dựa trên phần tử đang được chọn (thẻ tr)
    $(deleteButton).parent().parent().remove();
  }
}

// Table sorting
$('table')
  .on('click', 'th', function () {
    var index = $(this).index(),
      rows = [],
      thClass = $(this).hasClass('asc') ? 'desc' : 'asc';

    $('#table th').removeClass('asc desc');
    $(this).addClass(thClass);

    $('#table tbody tr').each(function (index, row) {
      rows.push($(row).detach());
    });

    rows.sort(function (a, b) {
      var aValue = $(a).find('td').eq(index).text(),
        bValue = $(b).find('td').eq(index).text();

      return aValue > bValue ?
        1 :
        aValue < bValue ?
          -1 :
          0;
    });

    if ($(this).hasClass('desc')) {
      rows.reverse();
    }

    $.each(rows, function (index, row) {
      $('#table tbody').append(row);
    });
  });

// render du lieu
$(function () {
  renderContent();
})

// Search du lieu
$("#search").on("keyup", function () {
  var value = $(this).val().toLowerCase();
  $("#table tr").filter(function () {
    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
  });
});
