import sys
import re

file_path = r'D:\AI\portfolio_new\index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add Particles.js to head
if 'particles.min.js' not in content:
    content = content.replace(
        '</head>',
        '    <script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script>\n</head>'
    )

# 2. Add particles div to home section
if 'particles-js' not in content:
    content = content.replace(
        '<section id="home" class="home-section">\n        <div class="container">',
        '<section id="home" class="home-section">\n        <div id="particles-js" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; z-index: 0;"></div>\n        <div class="container" style="z-index: 2; position: relative;">'
    )

# 3. Add Filter Menu
if 'filter-menu' not in content:
    content = content.replace(
        '<h2 class="section-title">Projects</h2>\n            <div class="projects-grid">',
        """<h2 class="section-title">Projects</h2>
            <div class="filter-menu">
                <button class="filter-btn active" data-filter="all">All</button>
                <button class="filter-btn" data-filter="Data Science">Data Science</button>
                <button class="filter-btn" data-filter="Data Analysis">Data Analysis</button>
                <button class="filter-btn" data-filter="AI">AI</button>
            </div>
            <div class="projects-grid">"""
    )

# 4. Add data-category to existing projects
existing_projects = {
    'amazon-sales-analysis': 'Data Analysis',
    'sales-analysis-tableau': 'Data Analysis',
    'gold-currency-analysis': 'Data Analysis',
    'facial-expression-analysis': 'AI',
    'ai-driver-monitoring': 'AI',
    'customer-data-analytics': 'Data Analysis'
}

for project, category in existing_projects.items():
    pattern = f'<div class="project-card" data-github="https://github.com/Youcef-bahgat/{project}">'
    replacement = f'<div class="project-card" data-category="{category}" data-github="https://github.com/Youcef-bahgat/{project}">'
    content = content.replace(pattern, replacement)

# 5. Add new projects
new_projects_html = """
                <!-- Data Science Salaries -->
                <div class="project-card" data-category="Data Science" data-github="https://github.com/Youcef-bahgat/Data-Science-Salaries">
                    <div class="project-image">
                        <img src="assets/images/projects/Data Science Salaries.jpg" alt="Data Science Salaries" onerror="this.src='https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&q=80'">
                    </div>
                    <div class="project-info">
                        <h3>Data Science Salaries</h3>
                        <p>Comprehensive exploratory data analysis on Data Science salaries globally, using dynamic visualization techniques with Python.</p>
                        <div class="project-tools">
                            <span>Python</span>
                            <span>Pandas</span>
                            <span>Seaborn</span>
                        </div>
                        <div class="project-link"><i class="fab fa-github"></i> View on GitHub</div>
                    </div>
                </div>

                <!-- USA Housing Price Prediction -->
                <div class="project-card" data-category="Data Science" data-github="https://github.com/Youcef-bahgat/-USA-Housing-price-prediction">
                    <div class="project-image">
                        <img src="assets/images/projects/USA Housing.jpg" alt="USA Housing" onerror="this.src='https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=500&q=80'">
                    </div>
                    <div class="project-info">
                        <h3>USA Housing Price Prediction</h3>
                        <p>Machine Learning model to predict housing prices in the USA using Multiple Linear Regression based on various property features.</p>
                        <div class="project-tools">
                            <span>Python</span>
                            <span>Scikit-learn</span>
                            <span>Regression</span>
                        </div>
                        <div class="project-link"><i class="fab fa-github"></i> View on GitHub</div>
                    </div>
                </div>

                <!-- Car Price Prediction -->
                <div class="project-card" data-category="Data Science" data-github="https://github.com/Youcef-bahgat/Car-Price-Prediction">
                    <div class="project-image">
                        <img src="assets/images/projects/Car Price.jpg" alt="Car Price Prediction" onerror="this.src='https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=500&q=80'">
                    </div>
                    <div class="project-info">
                        <h3>Car Price Prediction</h3>
                        <p>Predictive model built to estimate the market value of used cars employing advanced machine learning regression techniques.</p>
                        <div class="project-tools">
                            <span>Python</span>
                            <span>Machine Learning</span>
                            <span>EDA</span>
                        </div>
                        <div class="project-link"><i class="fab fa-github"></i> View on GitHub</div>
                    </div>
                </div>

                <!-- Object Detection Using YOLO -->
                <div class="project-card" data-category="AI" data-github="https://github.com/Youcef-bahgat/Object-Detection-Using-Yolo">
                    <div class="project-image">
                        <img src="assets/images/projects/YOLO Detection.jpg" alt="Object Detection YOLO" onerror="this.src='https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=500&q=80'">
                    </div>
                    <div class="project-info">
                        <h3>Object Detection Using YOLO</h3>
                        <p>Implemented real-time object detection using the You Only Look Once (YOLO) framework, delivering high-speed and accurate visual recognition.</p>
                        <div class="project-tools">
                            <span>Computer Vision</span>
                            <span>YOLO</span>
                            <span>Python</span>
                        </div>
                        <div class="project-link"><i class="fab fa-github"></i> View on GitHub</div>
                    </div>
                </div>

                <!-- Sign Language Detection -->
                <div class="project-card" data-category="AI" data-github="https://github.com/Youcef-bahgat/Sign-Language-Detection-">
                    <div class="project-image">
                        <img src="assets/images/projects/Sign Language.jpg" alt="Sign Language Detection" onerror="this.src='https://images.unsplash.com/photo-1528699633788-424224dc89b5?auto=format&fit=crop&w=500&q=80'">
                    </div>
                    <div class="project-info">
                        <h3>Sign Language Detection</h3>
                        <p>Developed an AI system that interprets sign language gestures in video streams to facilitate accessibility using deep learning.</p>
                        <div class="project-tools">
                            <span>Deep Learning</span>
                            <span>OpenCV</span>
                            <span>CNN</span>
                        </div>
                        <div class="project-link"><i class="fab fa-github"></i> View on GitHub</div>
                    </div>
                </div>

                <!-- Cat vs Dog CNN -->
                <div class="project-card" data-category="AI" data-github="https://github.com/Youcef-bahgat/Cat-VS-Dog-CNN">
                    <div class="project-image">
                        <img src="assets/images/projects/Cat vs Dog.jpg" alt="Cat vs Dog CNN" onerror="this.src='https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=500&q=80'">
                    </div>
                    <div class="project-info">
                        <h3>Cat vs Dog Classification (CNN)</h3>
                        <p>Custom Convolutional Neural Network (CNN) engineered to accurately classify images of cats and dogs with high precision.</p>
                        <div class="project-tools">
                            <span>TensorFlow</span>
                            <span>Keras</span>
                            <span>Computer Vision</span>
                        </div>
                        <div class="project-link"><i class="fab fa-github"></i> View on GitHub</div>
                    </div>
                </div>

                <!-- Helmet Detection YOLOv8 -->
                <div class="project-card" data-category="AI" data-github="https://github.com/Youcef-bahgat/helmet-detection-yolov8">
                    <div class="project-image">
                        <img src="assets/images/projects/Helmet Detection.jpg" alt="Helmet Detection" onerror="this.src='https://images.unsplash.com/photo-1588636284695-1f9e23eb5211?auto=format&fit=crop&w=500&q=80'">
                    </div>
                    <div class="project-info">
                        <h3>Helmet Detection YOLOv8</h3>
                        <p>Safety compliance system utilizing state-of-the-art YOLOv8 architecture to automatically detect whether individuals are wearing safety helmets.</p>
                        <div class="project-tools">
                            <span>PyTorch</span>
                            <span>YOLOv8</span>
                            <span>AI Safety</span>
                        </div>
                        <div class="project-link"><i class="fab fa-github"></i> View on GitHub</div>
                    </div>
                </div>
            </div>
"""
if 'Data-Science-Salaries' not in content:
    content = content.replace('            </div>\n        </div>\n    </section>\n\n    <!-- Skills & Tools Section -->', new_projects_html + '        </div>\n    </section>\n\n    <!-- Skills & Tools Section -->')

# 6. Update Skills
if 'Computer Vision' not in content:
    content = content.replace(
        '<li>Machine Learning (Scikit-learn, TensorFlow)</li>\n                                <li>SQL Server (DDL, DML, DQL, T-SQL)</li>\n                                <li>Deep Learning (TensorFlow)</li>',
        '<li>Machine Learning (Scikit-learn, PyTorch, TensorFlow)</li>\n                                <li>Computer Vision (OpenCV, YOLO, CNNs)</li>\n                                <li>SQL Server (DDL, DML, DQL, T-SQL)</li>'
    )

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("HTML update successful.")
