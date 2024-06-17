import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { db } from '../../utils/firebase';
import { collection, getDocs } from 'firebase/firestore';

const AdminPage = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const feedbackCollection = collection(db, 'Feedback');
      const feedbackSnapshot = await getDocs(feedbackCollection);
      const feedbackList = feedbackSnapshot.docs.map(doc => doc.data());
      setFeedbackData(feedbackList);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Prepare data for the charts
  const serviceRatings = feedbackData.map(item => item.serviceRating);
  const recommendationScores = feedbackData.map(item => item.recommendation);

  // Service Ratings Data for Pie Chart
  const serviceRatingsData = {
    labels: ['Awesome', 'Good', 'Average', 'Bad', 'Terrible'],
    datasets: [
      {
        label: 'Service Ratings',
        data: [
          serviceRatings.filter(rating => rating === 1).length,
          serviceRatings.filter(rating => rating === 2).length,
          serviceRatings.filter(rating => rating === 3).length,
          serviceRatings.filter(rating => rating === 4).length,
          serviceRatings.filter(rating => rating === 5).length,
        ],
        backgroundColor: ['#4caf50', '#8bc34a', '#ffeb3b', '#ff9800', '#f44336'],
      },
    ],
  };

  // Recommendation Scores Data for Bar Chart
  const recommendationScoresData = {
    labels: Array.from({ length: 8 }, (_, i) => i),
    datasets: [
      {
        label: 'Recommendation Scores',
        data: Array.from({ length: 8 }, (_, i) =>
          recommendationScores.filter(score => score === i).length
        ),
        backgroundColor: '#42a5f5',
      },
    ],
  };

  // Calculate average recommendation score
  const avgRecommendationScore =
    recommendationScores.reduce((acc, score) => acc + score, 0) / recommendationScores.length;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Service Ratings</h2>
          <Pie data={serviceRatingsData} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Recommendation Scores</h2>
          <Bar data={recommendationScoresData} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg col-span-1 md:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Average Recommendation Score</h2>
          <div className="flex justify-center items-center">
            <CircularProgressbar
              value={avgRecommendationScore}
              maxValue={7}
              text={`${avgRecommendationScore.toFixed(1)}/7`}
              styles={buildStyles({
                textColor: '#f88',
                pathColor: '#4caf50',
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
