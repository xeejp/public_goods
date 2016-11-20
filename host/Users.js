import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import throttle from 'react-throttle-render'

import { Card, CardHeader, CardText } from 'material-ui/Card'

import { openParticipantPage } from './actions'

const User = ({ id, profit, invested, openParticipantPage }) => (
  <tr>
    <td><a onClick={openParticipantPage(id)}>{id}</a></td>
    <td>{profit}</td>
    <td>{invested}</td>
  </tr>
)

const UsersList = ({participants, openParticipantPage}) => (
  <table>
    <thead><tr><th>id</th><th>profit</th><th>invested</th></tr></thead>
    <tbody>
      {
        Object.keys(participants).map(id => (
          <User
            key={id}
            id={id}
            profit={participants[id].profit}
            invested={participants[id].invested ? "投資済" : "未投資"}
            openParticipantPage={openParticipantPage}
          />
        ))
      }
    </tbody>
  </table>
)

const Group = ({ id, round, state, members }) => (
  <tr><td>{id}</td><td>{round}</td><td>{state}</td><td>{members}</td></tr>
)

const Groups = ({ groups, participants }) => (
  <table>
    <thead><tr><th>id</th><th>round</th><th>state</th><th>members</th></tr></thead>
    <tbody>
      {
        Object.keys(groups).map(id => (
          <Group
            key={id}
            id={id}
            round={groups[id].round}
            state={groups[id].state}
            members={groups[id].members.length}
          />
        ))
      }
    </tbody>
  </table>
)

const mapStateToProps = ({ groups, participants }) => ({ groups, participants })

const mapDispatchToProps = (dispatch) => {
  const open = bindActionCreators(openParticipantPage, dispatch)
  return {
    openParticipantPage: (id) => () => open(id)
  }
}

const Users = ({ groups, participants, openParticipantPage }) => (
  <div>
    <Card>
      <CardHeader
        title={"登録者 " + Object.keys(participants).length + "人"}
        actAsExpander={true}
        showExpandableButton={true}
      />
      <CardText expandable={true}>
        <UsersList
          participants={participants}
          openParticipantPage={openParticipantPage}
        />
      </CardText>
    </Card><br />
    <Card>
      <CardHeader
        title={"グループ " + Object.keys(groups).length + "グループ"}
        actAsExpander={true}
        showExpandableButton={true}
      />
      <CardText expandable={true}>
        <Groups
          groups={groups}
          participants={participants}
        />
      </CardText>
    </Card>
  </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(throttle(Users, 200))
