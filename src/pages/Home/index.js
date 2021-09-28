import React from 'react';
import {View, Text} from 'react-native';
import {Container, SearchContainer, SearchButton, Input} from './styles';

import Header from '../../components/Header';
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
        </Container>
    )
}