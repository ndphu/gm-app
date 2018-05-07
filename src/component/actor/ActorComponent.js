import React from 'react';
import actorService from '../../service/ActorService';
import {loader} from '../commons/GlobalLoaderBar';
import MovieGridComponent from '../commons/MovieGridComponent';
import PagingComponent from '../commons/PagingComponent';

class ActorComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      pageSize: 60,
    };
    this.paginationPageClick.bind(this);
    this.retrieveMovies.bind(this);
  }
  
  componentDidMount = () => {
    this.retrieveMovies(this.props.match.params.actorKey, this.props.match.params.page);
  };
  
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.match.params.page !== this.props.match.params.page
      || nextProps.match.params.actorKey !== this.props.match.params.actorKey) {
      this.retrieveMovies(nextProps.match.params.actorKey, nextProps.match.params.page);
    }
  };
  
  retrieveMovies = (actorKey, page) => {
    loader.start();
    this.setState({
      movies: []
    });
    actorService.getActorByKey(actorKey).then(actor => {
        actorService.getItemsByActor(actor, page, this.state.pageSize).then(resp => {
          const items = resp.items;
          this.setState({
            actor: resp.actor,
            items: items.docs,
            paging: {
              number: items.page,
              size: items.limit,
              totalPages: items.pages,
              totalElements: items.total
            },
          });
          loader.finish();
          }
        )
      }
    );
  };
  
  paginationPageClick = (page) => {
    this.props.history.push(`/actor/${this.state.actor.key}/page/${page}`);
  };
  
  render = () => (
    <div>
      <MovieGridComponent items={this.state.items} onItemClick={this.handleItemClick}/>
      {this.state.items.length > 0 && (
        <PagingComponent paging={this.state.paging}
                         onPageClick={this.paginationPageClick}/>
      )}
    </div>
  )
  
}

export default ActorComponent;