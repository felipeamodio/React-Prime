import React, {useState, useEffect} from 'react';
import {ScrollView, Modal} from 'react-native';
import {
        Container,
        Header,
        HeaderButton,
        Banner,
        ButtonLink,
        Title,
        ContentArea,
        Rate,
        ListGenres,
        Description
        } from './styles';
import {Feather, Ionicons} from '@expo/vector-icons';
import api, {key} from '../../services/api';

import {useNavigation, useRoute} from '@react-navigation/native';
import Stars from 'react-native-stars';

import Genres from '../../components/Genres';
import ModalLink from '../../components/ModalLink';

export default function Detail(){
    const navigation = useNavigation();
    const route = useRoute(); // para ter acesso ao parametro que mandamos na home
    const [openLink, setOpenLink] = useState(false);

    const [movie, setMovie] = useState({});

    useEffect(() => {
        let isActive = true;

        async function getMovie(){
            const response = await api.get(`/movie/${route.params?.id}`, {
                params: {
                    api_key: key,
                    language: 'pt-BR'
                }
            })
            .catch((err) => console.log(err)) //caso de erro na requisição

            //response vai trazer os resultados
            if(isActive){
                setMovie(response.data);
                //console.log(response.data);
            }
        }

        if(isActive){
            getMovie();
        }

        return () => {
            isActive = false;
        }
    }, [])

    return(
        <Container>
            <Header>
                <HeaderButton activeOpacity={0.7} onPress={() => navigation.goBack()}> 
                    <Feather name="arrow-left" size={28} color="#FFFFFF" />
                </HeaderButton>

                <HeaderButton>
                    <Ionicons name="bookmark" size={28} color="#FFFFFF" />
                </HeaderButton>
            </Header>

            <Banner source={{uri: `https://image.tmdb.org/t/p/original/${movie.poster_path}`}}
                    resizeMethod="resize"
             />

             <ButtonLink onPress={() => setOpenLink(true)}>
                 <Feather name="link" size={24} color="#FFFFFF" />
             </ButtonLink>

             <Title numberOfLines={2}>{movie.title}</Title>

             <ContentArea>
                 <Stars
                    default={movie.vote_average}
                    count={10}
                    half={true}
                    starSize={20}
                    fullStar={<Ionicons name="md-star" size={24} color="#E7A74E" />}
                    emptyStar={<Ionicons name="md-star-outline" size={24} color="#E7A74E" />}
                    halfStar={<Ionicons name="md-star-outline-half" size={24} color="#E7A74E" />}
                    disable={true}
                 />
                 <Rate>{movie.vote_average}/10</Rate>
             </ContentArea>

            <ListGenres
                data={movie?.genres}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => String(item.id)}
                renderItem={({item}) => <Genres data={item} />}
            />

            {
                // Descrição
            }

            <ScrollView showsVerticalScrollIndicator={false}>
                <Title>Descrição</Title>
                <Description>{movie?.overview}</Description>
            </ScrollView>

            <Modal animationType="slide" transparent={true} visible={openLink}>
                <ModalLink
                    link={movie?.homepage}
                    title={movie?.title}
                    closeModal={() => setOpenLink(false)}
                />
            </Modal>
        </Container>
    )
}