import React from 'react';
import {
    Container,
    BannerItem,
    Title,
    RateContainer,
    Rate
} from './styles';

import {Ionicons} from '@expo/vector-icons';

export default function SliderItem(){
    return(
        <Container activeOpacity={0.7}>
            <BannerItem 
                source={{uri: 'https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80'}}
            />
            <Title numberOfLines={1}>Vingadores</Title>
            <RateContainer>
                <Ionicons name="md-star" size={12} color="#E7A74E" />
                <Rate>9/10</Rate>
            </RateContainer>
        </Container>
    )
}