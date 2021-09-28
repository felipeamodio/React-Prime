import React from 'react';
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

export default function Home(){
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
                    data={[1,2,3,4]}
                    renderItem={({item}) => <SliderItem />}
                />
            </ScrollView>
        </Container>
    )
}