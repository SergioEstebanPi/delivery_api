-- cargar public.roles

INSERT INTO public.roles(
	id, name, image, route, created_at, updated_at)
	VALUES (1, 'cliente','https://png.pngtree.com/png-clipart/20210311/original/pngtree-customer-login-avatar-png-image_6015290.jpg','client/products/list','2023-05-12 19:00:00','2023-05-12 19:00:00');

INSERT INTO public.roles(
	id, name, image, route, created_at, updated_at)
	VALUES (2, 'restaurante','https://png.pngtree.com/png-clipart/20210309/original/pngtree-western-style-yellow-restaurant-clipart-png-image_5817361.jpg','restaurant/orders/list','2023-05-12 14:00:00','2023-05-12 14:00:00');

INSERT INTO public.roles(
	id, name, image, route, created_at, updated_at)
	VALUES (3, 'repartidor', 'https://png.pngtree.com/png-clipart/20200701/original/pngtree-delivery-man-ride-motorcycle-with-face-mask-png-image_5366464.jpg','delivery/orders/list','2023-05-13 00:00:00','2023-05-13 00:00:00');


-- cargar public.users

INSERT INTO public.users(
	id, email, name, lastname, phone, image, password, is_available, session_token, created_at, updated_at, notification_token)
	VALUES (1,'cliente1@gmail.com','cliente1','ap1','3100000000','https://firebasestorage.googleapis.com/v0/b/delivery-52266.appspot.com/o/image_1683990218797?alt=media&token=c4fa2c9e-a400-4fa6-849c-602b9c17a0d5','e10adc3949ba59abbe56e057f20f883e', null, null,'2023-05-13 15:03:39','2023-05-13 15:03:39', null);

INSERT INTO public.users(
	id, email, name, lastname, phone, image, password, is_available, session_token, created_at, updated_at, notification_token)
	VALUES (2,'restaurante1@gmail.com','restaurante1','resap1','3100000001','https://firebasestorage.googleapis.com/v0/b/delivery-52266.appspot.com/o/image_1683990345155?alt=media&token=c4fa2c9e-a400-4fa6-849c-602b9c17a0d5','e10adc3949ba59abbe56e057f20f883e', null, null,'2023-05-13 15:05:45','2023-05-13 15:05:45', null);

INSERT INTO public.users(
	id, email, name, lastname, phone, image, password, is_available, session_token, created_at, updated_at, notification_token)
	VALUES (3,'repartidor1@gmail.com','repartidor1','repap1','3100000002','https://firebasestorage.googleapis.com/v0/b/delivery-52266.appspot.com/o/image_1683990397672?alt=media&token=c4fa2c9e-a400-4fa6-849c-602b9c17a0d5','e10adc3949ba59abbe56e057f20f883e', null, null, '2023-05-13 15:06:38','2023-05-13 15:06:38', null);


-- cargar public.user_has_roles

INSERT INTO public.user_has_roles(
	id_user, id_rol, created_at, updated_at)
	VALUES (1,1,'2023-05-13 15:03:39','2023-05-13 15:03:39');


INSERT INTO public.user_has_roles(
	id_user, id_rol, created_at, updated_at)
	VALUES (2,1,'2023-05-13 15:05:45','2023-05-13 15:05:45');

INSERT INTO public.user_has_roles(
	id_user, id_rol, created_at, updated_at)
	VALUES (2,2,'2023-05-13 15:05:45','2023-05-13 15:05:45');

INSERT INTO public.user_has_roles(
	id_user, id_rol, created_at, updated_at)
	VALUES (3,1,'2023-05-13 15:06:38','2023-05-13 15:06:38');

INSERT INTO public.user_has_roles(
	id_user, id_rol, created_at, updated_at)
	VALUES (3,3,'2023-05-13 15:06:38','2023-05-13 15:06:38');


commit;
