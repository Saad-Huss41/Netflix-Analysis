import streamlit as st
import pandas as pd
import altair as alt
import plotly.express as px

st.set_page_config(
    page_title="Netflix Content Dashboard",
    page_icon="🎬",
    layout="wide",
    initial_sidebar_state="expanded")

alt.themes.enable("dark")
@st.cache_data
def load_data(path):
    df = pd.read_csv(path)

    df['date_added'] = pd.to_datetime(df['date_added'], errors='coerce')
    df['year_added'] = df['date_added'].dt.year
    df['country'] = df['country'].fillna('Unknown')
    df['first_country'] = df['country'].apply(lambda x: x.split(',')[0].strip())
    return df


data = load_data('data/netflix_titles.csv')

st.title("🎬 Netflix Content Dashboard")



st.header("1. Global Content Distribution")
country_counts = data['first_country'].value_counts().reset_index()
country_counts.columns = ['Country', 'Count']
country_counts = country_counts[country_counts['Country'] != 'Unknown']

fig_map = px.choropleth(country_counts, locations='Country', locationmode='country names',color = 'Count', hover_name='Country',
                        color_continuous_scale=px.colors.sequential.OrRd, title='Number of Titles by Production Country')

st.plotly_chart(fig_map, use_container_width=True)

st.header("2. The Rise of TV Shows vs. Movies")
content_trend = data.groupby(['year_added', 'type']).size().reset_index(name='count')
content_trend = content_trend[content_trend['year_added'].notna()]
trend_chart = alt.Chart(content_trend).mark_line(point=True).encode(x=alt.X('year_added:O', title='Year Added'),
    y=alt.Y('count:Q', title='Number of Titles Added'),
    color=alt.Color('type:N', title='Type', scale=alt.Scale(domain=['Movie', 'TV Show'], range=['#e50914', '#6957a0'])),
    tooltip=['year_added', 'type', 'count']
).properties(
    title='Number of Movies vs. TV Shows Added Over Time'
).interactive()

st.altair_chart(trend_chart, use_container_width=True)


st.header("3. What Genres Are Most Popular?")


def get_top_genres(df, content_type=None, top_n=10):
    """Calculates the top N genres for a given content type."""
    if content_type:
        df_filtered = df[df['type'] == content_type]
    else:
        df_filtered = df
    
    genres = df_filtered['listed_in'].str.split(', ').explode()
    top_genres = genres.value_counts().head(top_n).reset_index()
    top_genres.columns = ['genre', 'count']
    return top_genres


top_genres_overall = get_top_genres(data, top_n=10)
col1, col2 = st.columns(2)

with col1:
        top_genres_movies = get_top_genres(data, content_type='Movie', top_n=10)
        bar_chart_movies = alt.Chart(top_genres_movies).mark_bar(color='#e50914').encode(
            x=alt.X('count:Q', title='Number of Titles'),
            y=alt.Y('genre:N', sort='-x', title='Genre'),
            tooltip=['genre', 'count']
        ).properties(
            title='Top 10 Movie Genres'
        )
        st.altair_chart(bar_chart_movies, use_container_width=True)
with col2:
        top_genres_tv = get_top_genres(data, content_type='TV Show', top_n=10)
        bar_chart_tv = alt.Chart(top_genres_tv).mark_bar(color="#6957a0").encode(
            x=alt.X('count:Q', title='Number of Titles'),
            y=alt.Y('genre:N', sort='-x', title='Genre'),
            tooltip=['genre', 'count']
        ).properties(
            title='Top 10 TV Show Genres'
        )
        st.altair_chart(bar_chart_tv, use_container_width=True)

