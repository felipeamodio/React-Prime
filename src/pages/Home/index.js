import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native';
import {
        Container, 
        SearchContainer, 
        SearchButton, 
        Input, 
        Title,
        BannerButton,
        Banner,
        SliderMovie
       } from './styles';

import Header from '../../components/Header';
import SliderItem from '../../components/SliderItem';

import {Feather} from '@expo/vector-icons';

import api, {key} from '../../services/api';

import {getListMovies} from '../../utils/movie';

export default function Home(){
    const [nowMovies, setNowMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [topMovies, setTopMovies] = useState([]);

    useEffect(() => {
        let isActive = true;

        async function getMovies(){
            //passando tudo q vai precisar da URL
            //const original mas será feito de uma forma mais enxuta
          /*  const response = await api.get('/movie/now_playing', {
                params: {
                    api_key: key,
                    language: 'pt-BR',
                    page: 1
                }
            }) */
            //console.log(response.data);

            const [nowData, popularData, topData] = await Promise.all([
                api.get('/movie/now_playing', {
                    params: {
                        api_key: key,
                        language: 'pt-BR',
                        page: 1
                    }
                }),
                api.get('/movie/popular', {
                    params: {
                        api_key: key,
                        language: 'pt-BR',
                        page: 1
                    }
                }),
                api.get('/movie/top_rated', {
                    params: {
                        api_key: key,
                        language: 'pt-BR',
                        page: 1
                    }
                }),
            ])
            //console.log(popularData.data.results);
            const nowList = getListMovies(10, nowData.data.results);
            const popularList = getListMovies(10, popularData.data.results);
            const topList = getListMovies(10, topData.data.results);

            setNowMovies(nowList);
            setPopularMovies(popularList);
            setTopMovies(topList);
        }
        getMovies();
    }, []) // toda vez q a colchete estiver vazia ele vai chamar o que tem dentro da função quando a tela abrir

    return(
        <Container>
            <Header title="React Prime" />

            <SearchContainer>
                <Input 
                    placeholder="Ex: Vingadores"
                    placeholderTextColor="#DDD"
                />
                <SearchButton>
                    <Feather name="search" size={30} color="#FFFFFF" />
                </SearchButton>
            </SearchContainer>

            <ScrollView showsVerticalScrollIndicator={false}>
                <Title>Em Cartaz</Title>

                <BannerButton activeOpacity={0.9} onPress={() => alert('Banner')}>
                    <Banner 
                    source={{uri: 'https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80'}}
                    resizeMethod="resize"
                    />
                </BannerButton>

                <SliderMovie 
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={nowMovies}
                    renderItem={({item}) => <SliderItem data={item} />}
                    keyExtractor={(item) => String(item.id)}
                />

                {
                    // Populares
                }
                
                <Title>Populares</Title>

                <SliderMovie 
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={popularMovies}
                    renderItem={({item}) => <SliderItem data={item} />}
                    keyExtractor={(item) => String(item.id)}
                />

                {
                    // Mais votados
                }

                <Title>Mais Votados</Title>

                <SliderMovie 
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={topMovies}
                    renderItem={({item}) => <SliderItem data={item} />}
                    keyExtractor={(item) => String(item.id)}
                />
            </ScrollView>
        </Container>
    )
}