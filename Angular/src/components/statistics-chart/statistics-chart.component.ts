
import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../../services/statistics-service.service';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-statistics-chart',
  templateUrl: './statistics-chart.component.html',
  styleUrls: ['./statistics-chart.component.css'],
  standalone: true,
  imports: [NgxChartsModule]
})
export class StatisticsChartComponent implements OnInit {
  statistics = {
    questionCount: 0,
    imageCount: 0,
    feedbackCount: 0,
    userCount: 0
  };

  chartData: any[] = [];

  customColorScheme: Color = {
    domain: ['#007FFF', '#00C49F', '#FFBB28', '#FF8042'],
    group: ScaleType.Ordinal,
    name: 'customScheme',
    selectable: true
  };

  constructor(private statisticsService: StatisticsService,private router:Router) {}

  ngOnInit(): void {
    this.statisticsService.getStatistics().subscribe(data => {
      this.statistics.questionCount = data.questionCount.length;
      this.statistics.imageCount = data.imageCount.length;
      this.statistics.feedbackCount = data.feedbackCount.length;
      this.statistics.userCount = data.userCount.length;

      this.chartData = [
        { name: 'Questions', value: this.statistics.questionCount },
        { name: 'Images', value: this.statistics.imageCount },
        { name: 'Feedbacks', value: this.statistics.feedbackCount },
        { name: 'Users', value: this.statistics.userCount }
      ];
    });
  }
  goToHome(): void {
    this.router.navigate(['/']);
  }
}
