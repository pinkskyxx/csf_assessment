drop database if exists myorder; 

create database myorder; 

use myorder; 

create table myOrder ( 
    orderId char(26) not null unique, 
    date date, 
    name varchar(128), 
    address varchar(128),
    priority boolean,
    comments varchar(128), 
    cart varchar(128), 
    primary key (orderId) 
);


grant all privileges on myorder.* to fred@'%'; 

flush privileges;  