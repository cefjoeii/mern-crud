import _ from 'lodash'

import React, { Component } from 'react'
import { Search, Grid, Label} from 'semantic-ui-react'

const initialState = { isLoading: false, results: [], value: '' }

const resultRenderer = ({ id, nombre, apellido}) => <Label as="a" content={id + nombre + " " + apellido} basic size="large"/>

export default class SearchExampleStandard extends Component {
  
    state = initialState

  handleResultSelect = (e, { result }) => this.setState({ value: result.nombre })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState)

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = (result) => re.test(result.nombre)

      this.setState({
        isLoading: false,
        results: _.filter(this.props.source, isMatch),
      })
    }, 300)
  }

  render() {
    const { isLoading, results, value } = this.state
    return (
      <Grid>
        <Grid.Column width={6}>
          <Search
            input={{ icon: 'search', iconPosition: 'left' }}
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true,
            })}
            results={results}
            value={value}
            resultRenderer={resultRenderer}
          />
        </Grid.Column>
{/*        <Grid.Column width={10}>
          <Segment>
            <Header>State</Header>
            <pre style={{ overflowX: 'auto' }}>
              {JSON.stringify(this.state, null, 2)}
            </pre>
            <Header>Options</Header>
            <pre style={{ overflowX: 'auto' }}>
              {JSON.stringify(this.props.source, null, 2)}
            </pre>
          </Segment>
          </Grid.Column>  */}
      </Grid>
    )
  }
}