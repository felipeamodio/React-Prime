import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
    padding: 14px;
`;

export const Banner = styled.Image`
    width: 100%;
    height: 140px;
    border-radius: 8px;
`;

export const Title = styled.Text`
    font-weight: bold;
    color: #FFFFFF;
    font-size: 18px;
    padding-top: 8px;
`;

export const RateContainer = styled.View`
    flex-direction: row;
    align-items: center;
    padding-top: 5px;
`;

export const Rate = styled.Text`
    padding-left: 4px;
    color: #FFFFFF;
    font-size: 12px;
`;