import React, {useState, useEffect} from 'react';
import {ScrollView, ActivityIndicator} from 'react-native';
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
import {useNavigation} from '@react-navigation/native';

import Header from '../../components/Header';
import SliderItem from '../../components/SliderItem';

import {Feather} from '@expo/vector-icons';

import api, {key} from '../../services/api';

import {getListMovies, randomBanner} from '../../utils/movie';

export default function Home(){
    const navigation = useNavigation();

    const [nowMovies, setNowMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [topMovies, setTopMovies] = useState([]);
    const [bannerMovie, setBannerMovie] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isActive = true;
        const ac = new AbortController();

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

            if(isActive){
                //console.log(popularData.data.results);
                const nowList = getListMovies(10, nowData.data.results);
                const popularList = getListMovies(10, popularData.data.results);
                const topList = getListMovies(10, topData.data.results);

                //mostrar a imagem de forma aleatória
                setBannerMovie(nowData.data.results[randomBanner(nowData.data.results)]);

                setNowMovies(nowList);
                setPopularMovies(popularList);
                setTopMovies(topList);

                //Mudando o valor do loading
                setLoading(false);
            }
        }
        getMovies();

        return () => {
            isActive = false;
            ac.abort(); //caso esteja acontecendo algo asincrono ele irá abortar
        }
    }, []) // toda vez q a colchete estiver vazia ele vai chamar o que tem dentro da função quando a tela abrir

    function navigationDetail(item){
        navigation.navigate('Detalhes', {id: item.id})
    }

    //verificando se o loading é true para passar o Indicator
    if(loading){
        return(
            <Container>
                <ActivityIndicator size="large" color="#FFFFFF" />
            </Container>
        )
    }

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

                <BannerButton activeOpacity={0.9} onPress={() => navigationDetail(bannerMovie)}>
                    <Banner 
                    source={{uri: `https://image.tmdb.org/t/p/original/${bannerMovie.poster_path}`}}
                    resizeMethod="resize"
                    />
                </BannerButton>

                <SliderMovie 
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={nowMovies}
                    renderItem={({item}) => <SliderItem data={item} navigatePage={() => navigationDetail(item)} />}
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
                    renderItem={({item}) => <SliderItem data={item} navigatePage={() => navigationDetail(item)} />}
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
                    renderItem={({item}) => <SliderItem data={item} navigatePage={() => navigationDetail(item)} />}
                    keyExtractor={(item) => String(item.id)}
                />
            </ScrollView>
        </Container>
    )
}