const url = "http://localhost:3000/api";
const _doc = document;

const productsPage = () => {
  // window.location.replace('/');
};

const getOrders = () => {
  fetch(`${url}/orders/all-orders`)
  .then((res) => res.json())
  .then((res) => {
    const { success, data } = res;
    if(success) {
      const orderTableBody = _doc.getElementById('orderTable')

      const table  = data.map((res, idx) => {
        const { order_id, count, price } = res;
        return `<tr>
          <th scope="row">${idx}</th>
          <td>${order_id}</td>
          <td>${count}</td>
          <td>&#8377;${price}</td>
          <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="getOrderDetails(\'`+ order_id +`\')">
          Order Details
        </button></td>
      </tr>`;
    })
    orderTableBody.innerHTML = table.join('')
  }
  })
  .catch((err) => console.log(err));
}

const getOrderDetails = (id) => {
  console.log('test');
  fetch(`${url}/orders/${id}`).then((resData) => resData.json()).then((resData) => {
    const { data, success } = resData;
    console.log(resData);
    if(success) {
      const { product } = data;
      console.log(product, data);
      const tableData = product.map((val, idx) => {
        const { title, count, price, description } = val;
        return `<tr>
          <th scope="row">${idx}</th>
          <td>${title}</td>
          <td>${description}</td>
          <td>&#8377;${price}</td>
          <td>${count}</td>
      </tr>`;
      });
      const  tableproduct = _doc.getElementById('orderDetails');
      tableproduct.innerHTML = tableData;
    }
  });
}