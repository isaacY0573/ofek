PGDMP      6    	            }         
   users-ofek    17.4    17.4     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            �           1262    16408 
   users-ofek    DATABASE     r   CREATE DATABASE "users-ofek" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'he-IL';
    DROP DATABASE "users-ofek";
                     postgres    false            �            1259    16410 	   cardusers    TABLE     �   CREATE TABLE public.cardusers (
    id integer NOT NULL,
    name character varying(30),
    lastname character varying(30),
    age integer
);
    DROP TABLE public.cardusers;
       public         heap r       postgres    false            �            1259    16409    cardusers_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cardusers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.cardusers_id_seq;
       public               postgres    false    218            �           0    0    cardusers_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.cardusers_id_seq OWNED BY public.cardusers.id;
          public               postgres    false    217                        2604    16413    cardusers id    DEFAULT     l   ALTER TABLE ONLY public.cardusers ALTER COLUMN id SET DEFAULT nextval('public.cardusers_id_seq'::regclass);
 ;   ALTER TABLE public.cardusers ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    217    218    218            �          0    16410 	   cardusers 
   TABLE DATA           <   COPY public.cardusers (id, name, lastname, age) FROM stdin;
    public               postgres    false    218   �
       �           0    0    cardusers_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.cardusers_id_seq', 48, true);
          public               postgres    false    217            "           2606    16415    cardusers cardusers_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.cardusers
    ADD CONSTRAINT cardusers_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.cardusers DROP CONSTRAINT cardusers_pkey;
       public                 postgres    false    218            �   C  x�-��r�0�����%�%���AR����f�h�Y��Ʃ��]��������l���x\9�����(-���><d)4��5邇.E�UC�Y��u�R�AJ1�����f��u��kK�s1�M$Ɔbo���Rb�u$�vk�'��E9ń�>�x�\х(
�#���KM�(����<$_j.
��܈�\��B�����b��s�х�E1�6P�M�@�
O�ܔdv0ó�M�r��)��~��� &���`Gucwƴ^%d�}o��g�RH����cc{%�T��R�-�h���O	{�,���Gr���Q<C�)~1s.����?Yᅺ�&[����3*rgnf�r�E�sKΥ��K��p���U�)'7/��Oi]%qe�}?X.�KQ���8F{j��[i���=�:�}­J�M�'�A�Q�)����/���T����ƒ�C�6����[��ej���؊#H]R�	-'��}�]pF�2` Zb�p�«�}�����_�t`Z�.�R\,� �2�[�|��pvz�:���tM�]qJ-6��ތ	���^G��"dG�	!�0�Q     