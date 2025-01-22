import { useEffect, useState } from 'react';
import { query, collection, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase-config';
import {useGetUserInfo} from './useGetUserInfo';


export const useGetTransactions = () => {

    const [transactions, setTransactions] = useState([]);
    const [transactionTotals, setTransactionTotals] = useState({
        balance: 0.0, 
        income: 0.0, 
        expenses: 0.0});

    const transactionCollectionRef = collection(db, 'transactions');
    const {userID} = useGetUserInfo();


    const getTransactions = async () => {
        let unsubscribe;
        try {
            
            const queryTransaction = query(
                transactionCollectionRef, 
                where('userID', '==', userID),
                orderBy('createdAt')
            );

            unsubscribe = onSnapshot(queryTransaction, (snapshot) => {
                
                let docs = [];
                let totalIncome = 0;
                let totalExpense = 0;


                snapshot.forEach((doc) => {
                    const data = doc.data();
                    const id = doc.id;

                    docs.push({
                        ...data,
                        id
                    });


                    if (data.transactionType==="expense")
                    {
                        totalExpense += Number(data.transactionAmount);
                    }
                    else
                    {
                        totalIncome += Number(data.transactionAmount);
                    }


                });

                setTransactions(docs);

                let balance = totalIncome - totalExpense;
                setTransactionTotals({
                    balance,
                    expenses: totalExpense,
                    income: totalIncome
                });
            });

        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(() => {
        getTransactions();
    }, []);

    return{transactions, transactionTotals};

}
