const nodemailer = require("nodemailer");
require("dotenv").config();
exports.sendMail = (email, subject, content) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "nodemail.tvp@gmail.com",
      pass: process.env.PASS_MAIL,
    },
  });
  const mailOptions = {
    from: "Shopify",
    to: `${email}`, // Địa chỉ email đích
    subject: subject, // Tiêu đề email
    html: content, // Nội dung email
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log("Message sent: " + info.response);
    }
  });
};

exports.content = (user, phone, address, products, total) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #000;
            color: #fff7fc;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #111;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        th, td {
            padding: 10px;
            text-align: left;
            border-bottom: 1px solid #444;
        }
        th {
            background-color: #222;
        }
        .total {
            text-align: right;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Xin Chào ${user}</h1>
        <p>Phone:  ${phone}</p>
        <p>Address:  ${address}</p>
        <table>
            <tr>
                <th>Tên Sản Phẩm</th>
                <th>Hình Ảnh</th>
                <th>Giá</th>
                <th>Số Lượng</th>
                <th>Thành Tiền</th>
            </tr>
            ${products
              .map((data) => {
                const totalPrice = data.price * data.quantity;
                return `
               <tr>
                <td>${data.name}</td>
                <td><img src=${data.image} alt=${data.name} style="max-width: 100px;"></td>
                <td>${data.price} VND</td>
                <td>${data.quantity}</td>
                <td>${totalPrice} VND</td>
            </tr>
               `;
              })
              .join("")}
        </table>
        <div class="total">
            Tổng Thanh Toán: ${total} VND
        </div>
        <p>Cám ơn bạn!</p>
    </div>
</body>
</html>`;
};
