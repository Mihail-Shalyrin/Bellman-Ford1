import { Controller, Get, Post, Body,Query, Delete, Param } from '@nestjs/common';
import { GraphService } from './graph.service';
import { Edge } from './graph.edge';
@Controller('graph')
export class GraphController {
  constructor(private readonly graphService: GraphService) {}

  @Get()
  getGraphData() {
    return this.graphService.getGraphData();
  }

  @Post('node')
  addNode(@Body()  id: {id :string}) {
    this.graphService.addNode(id);
    return { success: true };
  }
  @Get('bellman-ford')
  async runBellmanFord(@Query('source') source: string) {
    return this.graphService.getDistances(+source);
    
  }
  @Post('edge')
  addEdge(@Body() body: Edge)  {
    let success : boolean = this.graphService.addEdge(body)  ;
    return { success };
  }
    
  @Delete('delete')
  delete(){
    this.graphService.delete();
    return {success : true}
  }
}