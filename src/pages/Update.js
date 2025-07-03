import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import Loading from "../components/Atom/Loading";
import CrudFunction from "../database/crudFuction";

const Update = ({ navigation: { goBack }, route: { params } }) => {
    //! useState
    const [name, setName] = React.useState(params?.nama);
    const [number, setNumber] = React.useState(params?.nomor);
    const [loading, setLoading] = React.useState(false);

    //! Update Data
    const onUpdate = async () => {
        setLoading(true)

        await CrudFunction.updateData("contact", params.id, {
            nama : name,
            nomor : number
        })

        setLoading(false)
        goBack()
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.isicard}>
                    <Text style={styles.teks}>Nomor: </Text>
                    <Text style={styles.teks}>Nama : </Text>
                </View>
                <View style={styles.input}>
                    <TextInput
                        placeholder="masukan nomor"
                        value={number}
                        onChangeText={setNumber}
                        keyboardType="numeric"
                    />
                    <TextInput
                        placeholder="masukan nama"
                        value={name}
                        onChangeText={setName}
                    />
                </View>
            </View>
            <View style={styles.btn}>
                <Button title="Update" onPress={() => onUpdate()} />
            </View>
            <Loading visible={loading} />
        </View>
    );
};

export default Update;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    card: {
        borderWidth: 1,
        marginTop: 50,
        marginBottom: 100,
        marginHorizontal: 20,
        height: 100,
        borderRadius: 10,
        flexDirection: "row",
    },
    isicard: {
        marginLeft: 20,
        marginTop: 20,
    },
    btn: {
        marginHorizontal: 50,
    },
    teks: {
        fontSize: 20,
    },
    input: {
        marginTop: 21,
    },
});
