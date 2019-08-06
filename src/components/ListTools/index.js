import { debounce } from 'lodash';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ToolsActions from '~/store/ducks/tools';

import {
  Container, ToolSection, Header, Search,
} from './styles';

export default function ListTools() {
  const dispatch = useDispatch();
  const tools = useSelector(state => state.tools);

  useEffect(() => {
    dispatch(ToolsActions.getToolRequest());
    // eslint-disable-next-line
  }, []);

  function debounceEvent(...args) {
    const debouncedEvent = debounce(...args);

    return (e) => {
      e.persist();
      return debouncedEvent(e);
    };
  }

  function filterProviders(e) {
    const word = e.target.value;
    dispatch(ToolsActions.getAllToolRequest(word));
    console.log(word);
  }

  return (
    <Container>
      <Header>
        <Search>
          <input
            type="text"
            placeholder="Procurar fornecedor"
            onChange={debounceEvent(filterProviders, 500)}
          />
        </Search>
      </Header>

      {tools.data.length ? (
        tools.data.map(tool => (
          <ToolSection key={tool.id}>
            <img src={tool.img} alt="IMG" />
            <div>
              <h1> {tool.name} </h1>
              <p> {tool.phone} </p>
            </div>
          </ToolSection>
        ))
      ) : (
        <h2> Fornecedor não existe! </h2>
      )}
    </Container>
  );
}
