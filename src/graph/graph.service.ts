import { Injectable } from '@nestjs/common';
import { Edge } from './graph.edge';
import { Node } from './graph.nodes';

@Injectable()
export class GraphService {
  private nodes : Node[] = [];
  private edges: Edge[] = [];

  getGraphData() {
    return { nodes: this.nodes, edges: this.edges };
  }

  addNode(node: Node) {
    this.nodes.push(node);
  }
  getDistances(point: number) {
    if (point < 1 || point > this.nodes.length) {
      return { error: 'Вершина отсуствует в графе' };
    }
     let distances = [];
    distances.length = this.nodes.length
      for (let index = 0; index < distances.length; index++) {
        
        distances[index] = Infinity;
      }

     distances[point - 1] = 0;

   
     for (let i = 1; i < distances.length ; i++) {
        for (let j = 0; j < this.edges.length;j++)
        {
          let u = this.edges[j].from -1;
          let v =  this.edges[j].to - 1;
          let w =  this.edges[j].weight;
          if (distances[u] != Infinity && distances[u] + w < distances[v])
          {
            distances[v] = distances[u] + w;
          }
        }
        
      }
   
      for (let j = 0; j < this.edges.length;j++)
      {
        let u = this.edges[j].from -1;
        let v =  this.edges[j].to - 1;
        let w =  this.edges[j].weight;
        if (distances[u] != Infinity && distances[u] + w < distances[v])
        {
          return { error: 'Содержит отрицательный цикл' };
        }
      }
      
  

    return distances;
   }
  addEdge(edge: Edge) : boolean {
    let vertex1 = edge.from.toString();
    let vertex2= edge.to.toString();
    let vertex1_bool = this.nodes.some(Node => Node.id === vertex1 )
    let vertex2_bool = this.nodes.some(Node => Node.id === vertex2 );
    if ( vertex1_bool && vertex2_bool)
    {
      this.edges.push(edge);
      return true;
    }
    else { return false;}
  }
  delete ()
  {
    this.nodes.splice(0, this.nodes.length);
    this.edges.splice(0,this.edges.length);
  }
}