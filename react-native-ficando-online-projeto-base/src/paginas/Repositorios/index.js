import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import estilos from './estilos';
import { pegarRepositoriosDoUsuario } from '../../servicos/requisicoes/repositorios';
import { useIsFocused } from '@react-navigation/native';

export default function Repositorios({ route, navigation }) {
    const [repo, setRepo] = useState([]);
    const estaNaTela = useIsFocused();

    useEffect(() => {
        async function fetchRepositorios() {
            const resultado = await pegarRepositoriosDoUsuario(route.params.id);
            setRepo(resultado);
        }
        fetchRepositorios();
    }, [estaNaTela]);
    //No entanto, você não pode usar diretamente uma função assíncrona como a função de efeito em um hook useEffect. Em vez disso, você deve criar uma função assíncrona separada e, em seguida, chamá-la dentro do useEffect

    return (
        <View style={estilos.container}>
            
                <Text style={estilos.repositoriosTexto}>{repo.length} repositórios criados</Text>
                <TouchableOpacity 
                    style={estilos.botao}
                    onPress={() => navigation.navigate('CriarRepositorio' , {id: route.params.id})}
                >
                    <Text style={estilos.textoBotao}>Adicionar novo repositório</Text>
                </TouchableOpacity>

                <FlatList
                    data={repo}
                    style={{ width:'100%' }}
                    KeyExtractor={repo => repo.id}
                    renderItem={({item}) => (
                        <TouchableOpacity style={estilos.repositorio} onPress={() => navigation.navigate('InfoRepositorio', {item})}> 
                            <Text style={estilos.repositorioNome}>{item.name}</Text>
                            <Text style={estilos.repositorioData}>Atualizado em {item.data}</Text>
                        </TouchableOpacity>
                    )}
                />
        </View>
    );
}


/*                <TextInput
                    placeholder="Busque por um usuário"
                    autoCapitalize="none"
                    style={estilos.entrada}
                    value={nomeUsuario}
                    onChangeText={setNomeUsuario}
                /> 
                
                
                
                    async function busca(){
        const resultado = await buscaUsuario(nomeUsuario)

        setNomeUsuario('')
        if (resultado ) {
            setUsuario(resultado)
        }
        else {
            Alert.alert('Usuario nao encontrado')
            setUsuario({})
        }
    }
                
                
                */