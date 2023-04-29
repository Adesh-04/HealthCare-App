import { useEffect, useState } from 'react'
import * as tf from '@tensorflow/tfjs'
import * as tfc from '@tensorflow/tfjs-converter'

import { db } from './../firebase/firebase'
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore'

export const Prediction = ({ data }) => {

    Key = '2dc9c05f84e446d1a8e1'

    // array of QnA answers for prediction
    const test_data = data
    // model from firebase
    const [model, setModel] = useState('file://E:/React Native/ExpoRouter/prediction/my_model.h5')
    // result of prediction
    const [result, setResult] = useState('')
    const [condition, setCondition] = useState('')

    useEffect(async () => {
        getData()

        setModel(await loadModel())

        await Predict(test_data)
    }, [])

    const getData = async () => {
        const profileRef = doc(db, "patient_data", Key)
        const patientDataCollection = await getDoc(profileRef)
        if (patientDataCollection.exists()) {
            tmp = patientDataCollection.data()
            setResult(tmp["Disease"])
            setCondition(tmp["Condition"])
        } else { console.log('No data found') }
    }

    async function loadModel() {
        const model = await tfc.loadGraphModel(model);
        const tfjsModel = await tf.loadLayersModel(
            await tfc.convertGraphModel(model, { enableGpu: true })
        );
        return tfjsModel;
    }

    const Predict = async ({ inputData }) => {
        console.log('model.predict')
        const prediction = await model.predict(inputData);
        console.log(prediction)

        setResult('new result')
        setCondition('new condition')
        sendData('result', 'condition')
    }

    const sendData = async ({ r, c }) => {
        const profileRef = doc(db, "patient_data", Key)
        await updateDoc(profileRef, {
            Disease: r,
            Condition: c,
            timestamp: serverTimestamp()
        });
        const patientRef = doc(db, "patient_QnA", Key)
        await updateDoc(patientRef, {
            value: 'val',
            timestamp: serverTimestamp()
        });
    }

}