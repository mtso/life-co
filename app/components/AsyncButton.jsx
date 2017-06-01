import React from 'react'

class AsyncButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
    }
    this.onClick = this.onClick.bind(this)
  }
  onClick(e) {
    e.preventDefault()
    this.setState({
      isLoading: true,
    }, () => this.props.onClick(() => {
      this.setState({
        isLoading: false,
      })
    }))
  }
  render() {
    return (
      <button
        disabled={this.state.isLoading}
        onClick={this.onClick}
      >
        {this.props.title || this.props.children || 'Submit'}
      </button>
    )
  }
}

export default AsyncButton
