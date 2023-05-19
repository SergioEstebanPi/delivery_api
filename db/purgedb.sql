TRUNCATE TABLE public.address CASCADE;
ALTER SEQUENCE address_id_seq RESTART WITH 1;

TRUNCATE TABLE public.categories CASCADE;
ALTER SEQUENCE categories_id_seq RESTART WITH 1;

TRUNCATE TABLE public.order_has_products CASCADE;
--ALTER SEQUENCE order_has_products_id_seq RESTART WITH 1;

TRUNCATE TABLE public.orders CASCADE;
ALTER SEQUENCE orders_id_seq RESTART WITH 1;

TRUNCATE TABLE public.products CASCADE;
ALTER SEQUENCE products_id_seq RESTART WITH 1;

TRUNCATE TABLE public.roles CASCADE;
ALTER SEQUENCE roles_id_seq RESTART WITH 1;

TRUNCATE TABLE public.user_has_roles CASCADE;
--ALTER SEQUENCE user_has_roles_id_seq RESTART WITH 1;

TRUNCATE TABLE public.users CASCADE;
ALTER SEQUENCE users_id_seq RESTART WITH 1;
