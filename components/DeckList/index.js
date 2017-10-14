import React from 'react'
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { decksReceive } from '../../actions'
import Deck from '../Deck'
import { getDecks, removeDecks } from '../../utils/api'
import styles from './styles'

class DeckList extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }
  componentDidMount () {
    getDecks()
      .then(decks => {
        this.props.decksReceive(decks)
      })
  }
  renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => this.props.navigation.navigate(
        'DeckDetail',
        { deckId: item.title },
      )}
    >
      <Deck deck={item} />
    </TouchableOpacity>
  )
  keyExtractor = (deck, index) => deck.title
  renderSeparator = () => <View style={styles.separator} />
  render() {
    const { decks } = this.props
    const deckArray = Object.keys(decks).map((deckKey) => {
      return decks[deckKey]
    })
    return (
      <View style={styles.container}>
        <FlatList
          data={deckArray}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    )
  }
}

function mapStateToProps({ decks }, props) {
  return {
    decks
  }
}

export default connect(
  mapStateToProps, { 
    decksReceive,
  }
)(DeckList)

