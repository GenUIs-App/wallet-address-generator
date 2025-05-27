# Công Cụ Tạo Ví Blockchain

[English](README.md) | Tiếng Việt | [中文](README.zh.md)

Một công cụ Node.js đơn giản để tạo ví Ethereum trên mạng chính và lưu trữ chúng một cách an toàn.

## Yêu Cầu

- Node.js (phiên bản 14 trở lên)
- npm (Node Package Manager)

## Cài Đặt

1. Clone repository
2. Cài đặt các dependencies:
```bash
npm install
```

## Cách Sử Dụng

Để tạo ví mới, bạn có thể sử dụng một trong các lệnh sau:

```bash
# Tạo ví ngẫu nhiên
npm start

# Tạo ví với một chuỗi cụ thể trong địa chỉ
npm start "12345"  # Sẽ tạo ví có chứa "12345" trong địa chỉ

# Hoặc sử dụng script create-wallet
npm run create-wallet "12345"

# Hoặc chạy trực tiếp với node
node src/index.js "12345"
```

Công cụ sẽ:
1. Tạo một ví Ethereum mới
   - Nếu có chuỗi được cung cấp, nó sẽ tiếp tục tạo ví cho đến khi tìm thấy một ví chứa chuỗi đó
   - Việc tìm kiếm không phân biệt chữ hoa chữ thường
   - Tất cả các lần thử đều được ghi lại vào các tệp trong thư mục `logs`
2. Hiển thị địa chỉ và khóa riêng tư
3. Lưu thông tin ví vào tệp JSON trong thư mục `wallets`
   - Định dạng tệp: `wallet_[tiền_tố_địa_chỉ]_[thời_gian].json`
   - Bao gồm: địa chỉ, khóa riêng tư, thời gian tạo và số lần thử (nếu sử dụng tìm kiếm chuỗi)

## Ghi Log

Công cụ tạo hai loại log cho mỗi phiên tạo:

### 1. Log Chi Tiết (`wallet_generation_[thời_gian].log`)
Chứa thông tin đầy đủ cho mỗi lần thử:
- Số lần thử
- Địa chỉ được tạo
- Khóa riêng tư
- Thời gian
- Liệu địa chỉ có chứa chuỗi mong muốn hay không (nếu được chỉ định)

### 2. Log Chỉ Địa Chỉ (`wallet_addresses_[thời_gian].txt`)
Một tệp văn bản đơn giản với một địa chỉ trên mỗi dòng để dễ theo dõi:
```
