'use server';

import { redirect } from "next/navigation";
import prisma from "./prisma";
import { getBooksById } from "./getter";

//フォームからの入力値をデータベースに登録
export async function addReview(data){
    const book = await getBooksById(data.get('id'));
    const input = {
        title: book.title,
        author: book.author,
        price: Number(book.price),
        publisher: book.publisher,
        published: book.published,
        image: book.image,
        read: new Date(data.get('read')),
        memo: data.get('memo')
    };

    //新規データであれば登録、既存データであれば更新
    await prisma.reviews.upsert({
        update: input,
        create: object.assign({}, input, {id: data.get('id')}),
        where: {
            id: data.get('id')
        }
    });
    //処理成功後はトップページにリダイレクト
    redirect('/');
}

//削除ボタンで指定のレビュー情報を削除
export async function removereview(data){
    await prisma.reviews.delete({
        where: {
            id: data
        }
    });
    //処理成功後はトップページにリダイレクト
    redirect('/');
}