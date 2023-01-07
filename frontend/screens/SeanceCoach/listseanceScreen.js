import React, { useEffect, useState } from 'react';
import { Searchbar } from 'react-native-paper';
//import SearchBar from 'react-native-platform-searchbar';
import {
  Box,
  Text,
  Pressable,
  HStack,
  VStack,
  Spacer,
  NativeBaseProvider,
  Center,
  Heading,
  Fab,
  Icon,
  Button,
  View,
  FlatList,
  TextInput,
} from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
import { ScrollView } from 'react-native-gesture-handler';
import SeanceService from '../../services/seance.service';
import { AntDesign, Entypo, MaterialIcons } from '@expo/vector-icons';

export default function ListSeanceScreen({ navigation }) {
  const [Seance, setSeance] = useState([]);

  const [listData, setListData] = useState('');

  const [searchValue, setSearchValue] = useState('');

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    EventService.deleteEvent(rowKey);
  };

  const renderHiddenItem = (data, rowMap) => {
    return <HStack flex='1' pl='2'></HStack>;
  };

  const onRowDidOpen = (rowKey) => {
    console.log('This row opened', rowKey);
  };

  const renderItem = ({ item, index }) => (
    <Box>
      <Pressable
        onPress={() =>
          navigation.navigate('Afficher une Séance', { data: item })
        }
        _dark={{
          bg: 'coolGray.800',
        }}
        _light={{
          bg: 'white',
        }}
      >
        <Box pl='4' pr='5' py='2'>
          <HStack alignItems='center' space={3}>
            <VStack>
              <Text
                color='coolGray.800'
                _dark={{
                  color: 'warmGray.50',
                }}
                bold
              >
                {item.nom}
              </Text>
              <Text
                color='coolGray.600'
                _dark={{
                  color: 'warmGray.200',
                }}
              >
                {item.periode}
              </Text>
            </VStack>
            <Spacer />
            <Text
              fontSize='xs'
              color='coolGray.800'
              _dark={{
                color: 'warmGray.50',
              }}
              alignSelf='flex-start'
            >
              {item.date}
            </Text>
            <Text
              fontSize='xs'
              color='coolGray.800'
              _dark={{
                color: 'warmGray.50',
              }}
              alignSelf='flex-start'
            >
              {item.objectif}
            </Text>
          </HStack>
        </Box>
      </Pressable>
    </Box>
  );

  useEffect(() => {
    const fetchData = async () => {
      await SeanceService.fetchSeance()
        .then((result) => setListData(result))
        .catch((e) => console.log('error', e));
    };
    fetchData();
  }, [listData]);

  useEffect(() => {
    let didCancel = false;
    const fetchData = async () => {
      const results = await SeanceService.fetchSeances(searchValue);
      if (!didCancel) {
        setSeance(results);
      }
    };
    fetchData();
    return () => {
      didCancel = true;
    };
  }, [searchValue]);

  return (
    <NativeBaseProvider>
      <Center h='100%'>
        <Box
          _dark={{
            bg: 'coolGray.800',
          }}
          _light={{
            bg: 'white',
          }}
          flex='1'
          safeAreaTop
          maxW='400px'
          w='100%'
        >
          <Heading p='4' pb='3' size='lg'>
            Liste des Séances
          </Heading>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Box bg='white' safeArea flex='1'>
              <Searchbar
                placeholder=' Chercher ici'
                enterButton='Search'
                size='large'
                className='seancesearch'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <SwipeListView
                data={listData}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                rightOpenValue={-130}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                onRowDidOpen={onRowDidOpen}
              />
              <SwipeListView
                data={searchValue}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                rightOpenValue={-130}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                onRowDidOpen={onRowDidOpen}
              />

              <Fab
                onPress={() => navigation.navigate("Ajout d'une séance")}
                shadow={2}
                size='md'
                placement='bottom-right'
                bg='#00BFFF'
                icon={
                  <Icon color='white' as={AntDesign} name='plus' size='sm' />
                }
              />
            </Box>
          </ScrollView>
        </Box>
      </Center>
    </NativeBaseProvider>
  );
}
