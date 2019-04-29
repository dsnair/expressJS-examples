# Database Queries

#1 find all customers that live in London. Returns 6 records.
```sql
SELECT * FROM Customers
WHERE City == 'London';
```

#2 find all customers with postal code 1010. Returns 3 customers.
```sql
SELECT * FROM Customers
WHERE PostalCode == '1010';
```

#3 find the phone number for the supplier with the ID 11. Should be (010) 9984510.
```sql
SELECT Phone FROM Suppliers
WHERE SupplierID = 11;
```

#4 list orders descending by the order date. The order with date 1997-02-12 should be at the top.
```sql
SELECT * FROM Orders
ORDER BY OrderDate DESC;
```

#5 find all suppliers who have names longer than 20 characters. You can use `length(SupplierName)` to get the length of the name. Returns 11 records.
```sql
SELECT * FROM Suppliers
WHERE length(SupplierName) > 20;
```

#6 find all customers that include the word "market" in the name. Should return 4 records.
```sql
SELECT * FROM Customers
WHERE CustomerName LIKE '%market%';
```

#7 add a customer record for _"The Shire"_, the contact name is _"Bilbo Baggins"_ the address is _"1 Hobbit-Hole"_ in _"Bag End"_, postal code _"111"_ and the country is _"Middle Earth"_.

#8 update _Bilbo Baggins_ record so that the postal code changes to _"11122"_.

#9 delete all users that have no orders. Should delete 17 (or 18 if you haven't deleted the record added) records.

#10 list orders grouped by customer showing the number of orders per customer. _Rattlesnake Canyon Grocery_ should have 7 orders.
```sql
SELECT c.CustomerName, 
       COUNT(o.OrderID) AS NumOrders
FROM Orders AS o 
     INNER JOIN Customers AS c
     ON o.CustomerID = c.CustomerID
GROUP BY c.CustomerName
ORDER BY NumOrders DESC;
```

#11 list customers names and the number of orders per customer. Sort the list by number of orders in descending order. _Ernst Handel_ should be at the top with 10 orders followed by _QUICK-Stop_, _Rattlesnake Canyon Grocery_ and _Wartian Herkku_ with 7 orders each.
```sql
SELECT c.CustomerName, 
       COUNT(o.OrderID) AS NumOrders
FROM Orders AS o 
     INNER JOIN Customers AS c
     ON o.CustomerID = c.CustomerID
GROUP BY c.CustomerName
ORDER BY NumOrders DESC;
```

#12 list orders grouped by customer's city showing number of orders per city. Returns 58 Records with _Aachen_ showing 2 orders and _Albuquerque_ showing 7 orders.
```sql
SELECT c.City, 
       COUNT(o.OrderID) AS NumOrders
FROM Customers AS c
     INNER JOIN Orders As o
     ON c.CustomerID = o.CustomerID
GROUP BY c.City;
```

