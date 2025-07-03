import React from "react";
import { StyleSheet, View, FlatList, Alert, Text, Button } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { onSnapshot, collection } from "firebase/firestore";
import Db from "../database/firebase";
import { UserContact, CreateUser, InsertContact, Loading, ErrorMassage } from "../components";
import CrudFunction from "../database/crudFuction";

const Home = ({ navigation }) => {
    //! useState
    const isFocus = useIsFocused()
    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [errorMassage, setErrorMassage] = React.useState(false)
    const [findParams, setFindParams] = React.useState("")

    //! GET Data
    const getData = async () => {

        try {
            const data = await CrudFunction.fetchDataCol("contact")
            setData(data)

        } catch (error) {
            setErrorMassage(error.message)
        }

        setLoading(false)
    }

    //! Insert Data
    const onFind = async () => {
        const search = await CrudFunction.search("contact", "nama", findParams)
        setData(search)
    }

    //! Delete Data
    const onDelete = async (id) => {
        await CrudFunction.deleteData("contact", id)
        getData()
    }

    const setKeywords = (keywords) => {
        if (keywords === "") {
            getData()
        }

        setFindParams(keywords)
    }

    React.useEffect(() => {
        const colRef = collection(Db, "contact");
        const unsubscribe = onSnapshot(colRef, async () => {
            await getData()
        });

        return () => {
            unsubscribe()
        }

    }, [isFocus]);


    return (
        <View style={styles.container}>
            <View style={styles.search}>
                <InsertContact
                    onPress={onFind}
                    find={findParams}
                    onFind={setKeywords}
                />
            </View>
            {
                data.length > 0 ?
                    data.map((contact, i) => {
                        return (
                            <UserContact
                                key={i}
                                nomor={contact.nomor}
                                nama={contact.nama}
                                onDelete={() => onDelete(contact.id)}
                                onPress={() =>
                                    navigation.navigate("Update", {
                                        nama: contact.nama,
                                        nomor: contact.nomor,
                                        id: contact.id,
                                    })
                                }
                            />
                        )
                    })
                    :
                    <View style={{ flex: 1, alignItems: "center", margin: 10 }}>
                        <Text>Data belum tersedia !</Text>
                    </View>
            }

            <CreateUser onPress={() => navigation.navigate("Create")} />
            {loading && <Loading />}
            {errorMassage && <ErrorMassage />}
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    search: {
        borderBottomWidth: 1,
        height: 70,
        borderColor: "#B5B5B5",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
});
