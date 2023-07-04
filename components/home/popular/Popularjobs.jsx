import { useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'

import styles from './popularjobs.style'

import { COLORS, SIZES } from '../../../constants'
import PopularjobCard from '../../common/cards/popular/PopularJobCard'
import { useRouter } from 'expo-router'
import useFetch from '../../../hook/useFetch'


const Popularjobs = () => {
  const router = useRouter()
  const {data, isLoading, error} = useFetch('search',
   {
    query:  'React developer in paris',
    num_pages: '1'
  })

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Job populaire</Text>
        <TouchableOpacity>
          <Text style={styles.cardsContainer}>Tout afficher</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Quelque chose s'est mal passé</Text>
        ) : (
          <FlatList 
            data={data}
            renderItem={({ item }) => (
              <PopularjobCard 
                item={item}
              />
            )}
            keyExtractor={item => item?.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />
        )
      
      }
      </View>
    </View>
  )
}

export default Popularjobs